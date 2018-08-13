package com.dch.sysinfo;

import com.dch.sysinfo.util.BrowserLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class SysInfoApplication {

    @Value("${server.port}")
    private String serverPort;

    @Value("${browser.launch}")
    private boolean browserLaunch;

    @Autowired
    private BrowserLauncher browserLauncher;

    @EventListener(ApplicationReadyEvent.class)
    public void doAfterStartup() {
        if(browserLaunch) {
            browserLauncher.launch("http://localhost:" + serverPort);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(SysInfoApplication.class, args);
    }

}
