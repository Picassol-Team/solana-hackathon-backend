"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarGenerator = void 0;
const common_1 = require("@nestjs/common");
const PImage = require("pureimage");
const fs = require("fs");
const https = require("https");
const http = require('http');
let AvatarGenerator = class AvatarGenerator {
    async draw(text) {
        const img1 = PImage.make(1000, 1000);
        const font = PImage.registerFont(__dirname + "/SourceSansPro-SemiBold.ttf", "MyFont");
        const ctx = img1.getContext('2d');
        ctx.fillStyle = '#ACC8E5';
        ctx.fillRect(0, 0, 1000, 1000);
        await font.load();
        ctx.fillStyle = '#112A46';
        ctx.font = "75pt MyFont";
        const leftPadding = (1000 - (text.length * 30.4)) / 2;
        ctx.fillText(text, leftPadding, 500);
        PImage.encodePNGToStream(img1, fs.createWriteStream('xout.png')).then(() => {
            console.log("yazdı");
        }).catch((e) => {
            console.log(e);
        });
    }
    async downloadImageToUrl(url, filename) {
        let client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }
        return new Promise((resolve, reject) => {
            client.get(url, (res) => {
                res.pipe(fs.createWriteStream(filename))
                    .on('error', reject)
                    .once('close', () => resolve(filename));
            });
        });
    }
    ;
};
exports.AvatarGenerator = AvatarGenerator;
exports.AvatarGenerator = AvatarGenerator = __decorate([
    (0, common_1.Injectable)()
], AvatarGenerator);
//# sourceMappingURL=avatarGenerator.js.map