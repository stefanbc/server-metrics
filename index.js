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

    }

}