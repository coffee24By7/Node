REM First you need to create a home for your website.

REM I called mine  A:\SITE

REM Change to this folder in a command prompt

REM copy all files from the Get Ready For Node under Downloads For Class (overwrite if needed)

npm init

REM Answer all questions or enter through the

npm install --save express

copy the files from the DownloadsForClass\Site forlder

REM Call this cmd 
PrepareNodeModules.cmd

REM This will run for a while and will do a lot of things to your folder to get it ready.  
REM Dont worry about warnings and errors.   For the most part it gets past them.

REM You should see a new folder called node_modules

REM Now call NPM update

REM This will update all modules

REM run from a commnad prompt in your site folder
node index.js 

REM open a browser and browse to http://localhost:3000

REM You should see hello world.  If you do then you are good for express

REM Make sure Mongo is installed, running and working or you have setup and have the information for
REM the mLab Mongo


REM make sure to start mongo.  I have the command startmongo.cmd provide in your site directory

REM RUN

REM --------------------------
NPM install Express --save
npm install url -g
npm install fresh -g
npm install cookie -g
npm install methods -g
npm install crc -g
npm install send -g
npm install connect -g
npm install commander -g
npm install cjs

REM copy all files from the starter files for nodejs (overwrite if needed)

npm install

npm update

REM open compass and create a db call dang-thats-delicious

npm install mongoose
npm install brew

REM Run this 
"C:\Program Files\MongoDB\Server\4.2\bin\mongo" --version

REM You should see somethhing like this
MongoDB shell version v4.2.2
git version: a0bbbff6ada159e19298d37946ac8dc4b497eadf
allocator: tcmalloc
modules: none
build environment:
    distmod: 2012plus
    distarch: x86_64
    target_arch: x86_64

REM assuming you didn't add secure connnections and you created the DB right change your connect string in the environment file
mongodb://localhost:27017//dang-thats-delicious

I already did this so it may be correct.  If you have mLAB use the connect string they give you.

REM To load sample data, run the following command in your terminal:

npm run sample

REM If you have previously loaded in this data, you can wipe your database 100% clean with:
npm run blowitallaway

REM That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:


