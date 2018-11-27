"use strict";

import * as os from 'os';
import osName from 'os-name';
import getos from 'getos';
import macosRelease from 'macos-release';
import winRelease from 'win-release';
import humem from 'humem';
import internalIp from 'internal-ip';
import publicIp from 'public-ip';
import netmask from 'ipmask';
import osUptime from 'os-uptime';
import publicIp from 'public-ip';
import ipLocation from 'iplocation';

/**
 * @description The main class for the Server Stats npm module
 * @export
 * @class ServerStats
 */
export class ServerStats {

    /**
     *Creates an instance of ServerStats.
     * @param {String} model
     * @memberof ServerStats
     */
    constructor(model) {
        this.model = model;
    }

    get() {

        if(this.model === 'basic') {
            return basicModel();
        } else if (this.model === 'advanced') {
            return advancedModel();
        }

    }

    basicModel() {

        return {
            uptime: this.getUptime(),
            currentDate: this.getCurrentDate(),
            activeDate: this.getActiveDate(),
            time: this.getTime(),
            location: data.location
        };

    }

    advancedModel() {

        let object = {
            os: this.getOS(),
            processor: this.parseCPUModel(),
            architecture: os.arch(),
            totalMem: this.parseTotalMem(),
            hostname: os.hostname(),
            localIp: data.localIp,
            publicIp: data.publicIp,
            networkMask: netmask.netmask,
            mac: netmask.mac
        };

        return Object.assign(object, this.basicModel());

    }

}