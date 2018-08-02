package com.dch.sysinfo.service;

public class MemoryEntry {

    private long free;

    private long used;

    public MemoryEntry(long free, long used) {
        this.free = free;
        this.used = used;
    }

    public long getFree() {
        return free;
    }

    public void setFree(long free) {
        this.free = free;
    }

    public long getUsed() {
        return used;
    }

    public void setUsed(long used) {
        this.used = used;
    }
}
