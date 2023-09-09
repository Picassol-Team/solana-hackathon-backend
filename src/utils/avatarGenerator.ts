import { Injectable } from "@nestjs/common";

const PImage = require( "pureimage")
const fs = require( "fs")
const https = require("https")
const http = require('http');

@Injectable()
export class AvatarGenerator{
    async draw(text) {
        const img1 = PImage.make(1000, 1000);
        const font = PImage.registerFont(
          __dirname + "/SourceSansPro-SemiBold.ttf",
          "MyFont"
        );
        const ctx = img1.getContext('2d');
        ctx.fillStyle = '#ACC8E5';
        ctx.fillRect(0,0,1000,1000);
        await font.load();
        ctx.fillStyle = '#112A46';
        ctx.font = "75pt MyFont";
    
        const leftPadding=(1000-(text.length*30.4))/2;
    
        ctx.fillText(text,leftPadding, 500);
        PImage.encodePNGToStream(img1, fs.createWriteStream('xout.png')).then(() => {
            console.log("yazdı");
        }).catch((e)=>{
            console.log(e);
        });
    }
    
    async downloadImageToUrl(url, filename){
    
        let client = http;
        if (url.toString().indexOf("https") === 0) {
           client = https;
        }
        return new Promise((resolve, reject) => {
           client.get(url, (res) => {
               res.pipe(fs.createWriteStream(filename))
               .on('error', reject)
               .once('close', () => resolve(filename))
           })
       })
     };
     
    // downloadImageToUrl("https://api.dicebear.com/7.x/adventurer-neutral/png?seed=xasaaxssaxxaaxasxx", './xabc.jpg');
    
    
    // draw("Getir Sepeti Nft");
}