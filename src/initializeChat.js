

export default store => {
    if(!window){
        console.log('window not found. Aborting initialization.');
        return false;
    }
    if(! window.connect){
        console.log('Connect not found on window. Check chatjs');
        return false;
    }
    if( !window.connect.ChatSession){
        console.log('ChatSession object not found. Check chatJS');
        return false
    }


    window.connect.ChatSession.setGlobalConfig({
        loggerConfig: { // optional, the logging configuration. If omitted, no logging occurs
          logger: { // optional, a logger object implementation
            debug: (msg) => console.debug(msg), // REQUIRED, can be any function
            info: (msg) => console.info(msg), // REQUIRED, can be any function
            warn: (msg) => console.warn(msg), // REQUIRED, can be any function
            error: (msg) => console.error(msg) // REQUIRED, can be any function
          },
          level: window.connect.ChatSession.LogLevel.WARN, // optional, defaults to: `connect.ChatSession.LogLevel.INFO`
        },
        region: "us-east-1", // optional, defaults to: "us-west-2"
      });

      return true;
}