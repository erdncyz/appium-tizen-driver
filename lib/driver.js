import { BaseDriver, DeviceSettings } from 'appium-base-driver';
import desiredConstraints from './desired-caps';
import commands from './commands/index';
import helpers from './tizen-helpers';
import Bootstrap from './tizen-bootstrap.js';
import log from './logger';
import _ from 'lodash';
import { DEFAULT_SDB_PORT } from 'appium-sdb';
import { tempDir } from 'appium-support';

const BOOTSTRAP_PORT = 8888;
const NO_PROXY = [
  ['POST', new RegExp('^/session/[^/]+/appium')],
  ['GET', new RegExp('^/session/[^/]+/appium')],
];

class TizenDriver extends BaseDriver {
  constructor (opts = {}, shouldValidateCaps = false) {
    super(opts, shouldValidateCaps);

    // Disable BaseDriver validation
    this.shouldValidateCaps = false;

    this.locatorStrategies = [
      'id',
      'accessibility id',
      'class name',
      'name'
    ];

    this.desiredCapConstraints = desiredConstraints;
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _.clone(NO_PROXY);
    this.settings = new DeviceSettings({ignoreUnimportantViews: false});
    this.bootstrapPort = BOOTSTRAP_PORT;

    for (let [cmd, fn] of _.toPairs(commands)) {
      TizenDriver.prototype[cmd] = fn;
    }
  }

  async createSession (caps, w3cCapabilities, otherParams) {
    try {
      // Extract capabilities from W3C format
      let actualCaps = {};

      // Appium 2.x'te capabilities farklı parametrelerde gelebilir
      let capabilitiesToProcess = w3cCapabilities || caps || otherParams;

      if (capabilitiesToProcess && capabilitiesToProcess.alwaysMatch) {
        // W3C format
        actualCaps = Object.assign({}, capabilitiesToProcess.alwaysMatch);

        // Extract appium: prefixed capabilities
        for (let key in capabilitiesToProcess.alwaysMatch) {
          if (key.startsWith('appium:')) {
            let cleanKey = key.replace('appium:', '');
            actualCaps[cleanKey] = capabilitiesToProcess.alwaysMatch[key];
          }
        }
      } else {
        // Direct capabilities
        actualCaps = capabilitiesToProcess || {};
      }

      // Set default values for Tizen driver
      if (!actualCaps.platformName) {
        actualCaps.platformName = 'Tizen';
      }
      if (!actualCaps.automationName) {
        actualCaps.automationName = 'Tizen';
      }

      // Validate required capabilities
      if (!actualCaps.appPackage) {
        throw new Error('The desired capabilities must include an appPackage');
      }

      // Store caps in this.opts for later use
      this.opts = Object.assign({}, this.opts, actualCaps);

      // Skip validation and create session directly
      const { v4: uuidV4 } = require('uuid');
      let sessionId = this.sessionId || uuidV4();
      this.sessionId = sessionId;

      // Set caps as this.caps
      this.caps = actualCaps;

      let serverDetails = {platform: 'LINUX',
                           webStorageEnabled: false,
                           takesScreenshot: false,
                           javascriptEnabled: true,
                           databaseEnabled: false,
                           networkConnectionEnabled: false,
                           locationContextEnabled: false,
                           warnings: {},
                           desired: this.caps};
      this.caps = Object.assign(serverDetails, this.caps);

      let defaultOpts = {
        tmpDir: await tempDir.staticDir(),
        fullReset: false,
        sdbPort: DEFAULT_SDB_PORT,
        tizenInstallTimeout: 50000
      };
      _.defaults(this.opts, defaultOpts);

      if (this.opts.noReset === true) {
        this.opts.fullReset = false;
      }
      if (this.opts.fullReset === true) {
        this.opts.noReset = false;
      }
      this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
      this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

      let {udid, emPort} = await helpers.getDeviceInfoFromCaps(this.opts);
      this.opts.udid = udid;
      this.opts.emPort = emPort;

      this.sdb = await helpers.createSDB(this.opts.udid,
                                         this.opts.emPort,
                                         this.opts.sdbPort,
                                         this.opts.suppressKillServer);

      await this.startTizenSession(this.opts);
      return [sessionId, this.caps];
    } catch (e) {
      try {
        await this.deleteSession();
      } catch (ign) {}
      throw e;
    }
  }

  get appOnDevice () {
    return this.helpers.isPackageOrBundle(this.opts.appPackage);
  }

  async startTizenSession () {
    if (this.opts.app) {
      await this.installApp(this.opts.app);
    }
    let isAppInstalled = await this.isAppInstalled(this.opts.appPackage);
    if (!isAppInstalled) {
      log.errorAndThrow('Could not find to App in device.');
    }
    if (this.opts.appPackage) {
      let isStartedApp = await this.isStartedApp();
      if (isStartedApp) {
        await this.closeApp();
      }
      await this.startApp({ timeout: 20000 });
    }

    this.bootstrap = new Bootstrap(this.sdb, this.bootstrapPort, this.opts);
    await this.bootstrap.start(this.opts.appPackage);

    if (this.opts.ignoreUnimportantViews) {
      await this.settings.update({ignoreUnimportantViews: this.opts.ignoreUnimportantViews});
    }
  }

  async checkPackagePresent () {
    log.debug('Checking whether package is present on the device');
    if (!(await this.sdb.shell([`app_launcher --list | grep ${this.opts.appPackage}`]))) {
      log.errorAndThrow(`Could not find package ${this.opts.appPackage} on the device`);
    }
  }

  async deleteSession () {
    log.debug('Shutting down Tizen driver');
    await super.deleteSession();
    if (this.bootstrap) {
      await this.sdb.forceStop(this.opts.appPackage);
      if (this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice) {
        await this.sdb.uninstall(this.opts.appPackage);
      }
      await this.bootstrap.shutdown();
      this.bootstrap = null;
    } else {
      log.debug("Called deleteSession but bootstrap wasn't active");
    }
  }

  validateDesiredCaps () {
    // Always return true - no validation needed
    return true;
  }

  proxyActive (sessionId) {
    super.proxyActive(sessionId);

    return this.jwpProxyActive;
  }

  getProxyAvoidList (sessionId) {
    super.getProxyAvoidList(sessionId);

    return this.jwpProxyAvoid;
  }

  canProxy (sessionId) {
    super.canProxy(sessionId);

    return false;
  }
}

export { TizenDriver };
export default TizenDriver;
