"use strict";

import dayjs from 'dayjs';
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
import ipLocation from 'iplocation';

/**
 * @description The main class for the Server Stats npm module
 * @export
 * @class ServerStats
 */
export class ServerStats {

    /**
     * Creates an instance of ServerStats.
     * @param {String} model
     * @memberof ServerStats
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * @description Gets the model object
     * @returns {Object} object
     * @memberof ServerStats
     */
    get() {

        if(this.model === 'basic') {
            return this.basicModel();
        } else if (this.model === 'advanced') {
            return this.advancedModel();
        }

    }

    /**
     * @description Gathers data for the basic model
     * @returns {Object} object
     * @memberof ServerStats
     */
    basicModel() {

        return {
            uptime: this.getUptime(),
            currentDate: this.getCurrentDate(),
            activeDate: this.getActiveDate(),
            time: this.getTime(),
            location: this.location
        };

    }

    /**
     * @description Gathers data for the advanced model
     * @returns {Object} object
     * @memberof ServerStats
     */
    advancedModel() {

        let object = {
            os: this.getOS(),
            processor: this.parseCPUModel(),
            architecture: os.arch(),
            totalMem: this.parseTotalMem(),
            hostname: os.hostname(),
            networkMask: netmask.netmask,
            mac: netmask.mac,
            localIp: this.localIp,
            publicIp: this.publicIp,
        };

        return Object.assign(object, this.basicModel());

    }

    /**
     * @description Calculates the current uptime, using the difference between the current time and the OS time.
     * @returns {Object} Object containing days, hours, minutes
     * @memberof ServerStats
     */
    getUptime() {
        let diffSeconds = dayjs().diff(osUptime, 'seconds'),
            calcMinutes = diffSeconds / 60,
            calcHours = calcMinutes / 60,
            days = Math.floor(calcHours / 24),
            hours = Math.floor(calcHours - (days * 24)),
            minutes = Math.floor(calcMinutes - (days * 60 * 24) - (hours * 60));

        return {
            days: this.pad(days),
            hours: this.pad(hours),
            minutes: this.pad(minutes)
        };
    }

    /**
     * @description Returns the current date
     * @returns {String} String containing the current date
     * @memberof ServerStats
     */
    getCurrentDate() {
        return dayjs().format('MMMM DD, YYYY');
    }

    /**
     * @description returns the date when the server became active
     * @returns {String} String containing the activation date
     * @memberof ServerStats
     */
    getActiveDate() {
        return dayjs(osUptime).format('MMMM DD, YYYY');
    }

    /**
     * @description Returns the current time
     * @returns {String} String containing the current time
     * @memberof ServerStats
     */
    getTime() {
        return {
            hh: dayjs().format('hh'),
            mm: dayjs().format('mm'),
            p: dayjs().format('a')
        };
    }

    /**
     * @description Retrives the current location after it receives the public IP.
     * @param {function} callback
     * @param {function} next
     * @memberof ServerStats
     */
    getLocation(callback, next) {
        publicIp.then(ip => {
            ipLocation(ip, (error, data) => {
                if (callback) {
                    return callback(data);
                }
            });
        }).catch(next);
    }

    /**
     * @description Returns the OS distribution and release
     * @returns {Object} Object containing the OS distribution and release
     * @memberof ServerStats
     */
    getOS() {
        let getPlatform = os.platform(),
            tempDist, dist, release;

        if (getPlatform === 'linux') {
            tempDist = getos((e, os) => { return os.dist; });
            release = getos((e, os) => { return os.release; });
        } else if (getPlatform === 'darwin') {
            release = macosRelease().version;
        } else if (getPlatform === 'win32') {
            release = winRelease();
        }

        if (getPlatform === 'darwin' || getPlatform === 'win32') {
            tempDist = osName();
        }

        tempDist = tempDist.split(' ');
        dist = tempDist[0];

        return { dist, release };
    }

    /**
     * @description Parses the CPU model retrived by the os module
     * @returns {String} String containing the frquency and model name
     * @memberof ServerStats
     */
    parseCPUModel() {
        let model = os.cpus()[0].model,
            split = model.split('@'),
            modelName = split[0].trim(),
            frequency = split[1].trim();

        let newModelName = modelName.split('-');
        modelName = newModelName[0].replace('CPU', '').replace(/\(.*?\)/g, '');

        return `${frequency} ${modelName}`;
    }

    /**
     * @description Parses the total memory of the server
     * @returns {String} String with the total memory
     * @memberof ServerStats
     */
    parseTotalMem() {
        let humemTotalMem = humem.totalmem,
            split = humemTotalMem.split(' '),
            round = Math.floor(split[0]),
            output = `${round} ${split[1]}`;

        return output;
    }

    /**
     * @description Retrives the current server internal IP and external IP.
     * @param {function} callback
     * @param {function} next
     * @memberof ServerStats
     */
    getIpObject(callback, next) {
        publicIp.then(ip => {
            let ipObject = {
                localIp: internalIp,
                publicIp: ip
            };

            if (callback) {
                return callback(ipObject);
            }
        }).catch(next);
    }

    /**
     * @description Adds leading zero to number
     * @param {number} number
     * @returns {number} Number with leading zero
     * @memberof ServerStats
     */
    pad(number) {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

}