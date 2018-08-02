package com.dch.sysinfo.web;


import com.dch.sysinfo.service.MemoryEntry;
import com.dch.sysinfo.service.SysInfoEntry;
import com.dch.sysinfo.service.SysInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SysInfoController {

    private final Logger logger = LoggerFactory.getLogger(SysInfoController.class);

    @Autowired
    private SysInfoService sysInfoService;

    @GetMapping("/sys")
    @PreAuthorize(SecurityRoles.ADMIN_ROLE)
    public List<SysInfoEntry> sysInfo() {
        return sysInfoService.getInfo();
    }

    @GetMapping("/mem")
    @PreAuthorize(SecurityRoles.ADMIN_ROLE)
    public MemoryEntry memInfo() {
        return sysInfoService.getMemory();
    }

    @GetMapping("/user")
    @PreAuthorize(SecurityRoles.ADMIN_ROLE)
    public UserEntry getUser(@AuthenticationPrincipal UserDetails user) {
        return new UserEntry(user.getUsername());
    }
}
