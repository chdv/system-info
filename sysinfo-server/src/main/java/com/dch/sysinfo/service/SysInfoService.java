package com.dch.sysinfo.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SysInfoService {

    private static final String[] SYSTEM_PROPS = new String[] {
            "java.version",
            "java.vendor",
            "java.vendor.url",
            "java.home",
            "java.vm.specification.version",
            "java.vm.specification.vendor",
            "java.vm.specification.name",
            "java.vm.version",
            "java.vm.vendor",
            "java.vm.name",
            "java.specification.version",
            "java.specification.vendor",
            "java.specification.name",
            "java.class.version",
//            "java.class.path",
            "java.io.tmpdir",
            "java.compiler",
            "java.ext.dirs",
            "os.name",
            "os.arch",
            "os.version",
            "file.separator",
            "path.separator",
            "line.separator",
            "user.name",
            "user.home",
            "user.dir"
        };

    public List<SysInfoEntry> getInfo() {
        List<SysInfoEntry> result = new ArrayList<>();
        long i = 0;
        add( result, i++,"availableProcessors", String.valueOf(Runtime.getRuntime().availableProcessors()));
        add( result, i++,"freeMemory", String.valueOf(Runtime.getRuntime().freeMemory()));
        add( result, i++,"maxMemory", String.valueOf(Runtime.getRuntime().maxMemory()));
        add( result, i++,"totalMemory", String.valueOf(Runtime.getRuntime().totalMemory()));

        for(String s : SYSTEM_PROPS) {
            add( result, i++, s , System.getProperty(s));
        }

        return result;
    }

    public MemoryEntry getMemory() {
        return new MemoryEntry(
                Runtime.getRuntime().maxMemory()/(1024*1024),
                (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory())/(1024*1024));
    }

    private void add(List<SysInfoEntry> list, long id,  String n, String v) {
        list.add(new SysInfoEntry(id , n, v));
    }

    public static void main(String[] args) {
        System.out.println(new SysInfoService().getInfo());
    }

}
