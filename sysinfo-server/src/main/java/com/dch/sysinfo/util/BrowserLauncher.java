package com.dch.sysinfo.util;

import org.springframework.stereotype.Component;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Component
public class BrowserLauncher {

    public void launch(String url) {
        if(Desktop.isDesktopSupported()){
            Desktop desktop = Desktop.getDesktop();
            try {
                desktop.browse(new URI(url));
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
            }
        } else {
            String os = System.getProperty("os.name").toLowerCase();
            Runtime runtime = Runtime.getRuntime();
            String runScript = "";
            if (os.indexOf( "win" ) >= 0) {
                runScript = "rundll32 url.dll,FileProtocolHandler ";
            } else if (os.indexOf( "mac" ) >= 0) {
                runScript = "open ";
            } else if (os.indexOf( "nix") >=0 || os.indexOf( "nux") >=0) {
                runScript = "xdg-open ";
            }
            try {
                runtime.exec(runScript + url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
