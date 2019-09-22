var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const config = require("./config")
const req = require("request")
var readline = require('readline');


let base_url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key="+config.API_KEY+"&q="

titles = []
for (let i = 2; i < process.argv.length;i++){
    titles.push(process.argv[i])
}

ids = []

function writeWaitingPercent(p) {
    //readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`waiting ... ${p}%`);
}


var yt = new YoutubeMp3Downloader({
    "ffmpegPath": "C:/ffmpeg/bin/ffmpeg.exe",        // Where is the FFmpeg binary located?
    "outputPath": "C:/Users/Osama/Desktop/nodeDownloads",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});


yt.on("finished", function(err, data) {
    console.log("Done")
    // console.log(JSON.stringify(data));
});
 
yt.on("error", function(error) {
    console.log(error);
});
 
yt.on("progress", function(progress) {
    // console.log(Math(progress.progress.percentage) + "%");
    writeWaitingPercent(Math.round(progress.progress.percentage))
});

ids = []

function getId(title){
    comp_url = base_url + title
    console.log(comp_url)
    req(comp_url,function(error,response,body) {
        console.log('statusCode:', response && response.statusCode);
        json_body = JSON.parse(body)
        id =(json_body["items"][0]["id"]["videoId"])
        yt.download(id)
    });
}




for(let i = 0; i<titles.length;i++){
    getId(titles[i])
}
 


