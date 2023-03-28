package com.AdvancedMapping.Mapping.Models;

import java.math.BigDecimal;

public class AddBalance {

    private String userId;
    private BigDecimal balance;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public AddBalance(String userId, BigDecimal balance) {
        this.userId = userId;
        this.balance = balance;
    }
}
