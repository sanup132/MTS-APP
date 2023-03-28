package com.AdvancedMapping.Mapping.Models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import net.bytebuddy.implementation.bind.annotation.Default;
import org.hibernate.validator.constraints.Range;


@Entity
@Table(name="UserAccount")
public class UserProfile {

	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@NotNull
	@Column(name="FirstName")
	private String fname;

	@NotNull
	@Column(name="LastName")
	private String lname;

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	@Id
	@Column(name="UserId")
	private String userId;

	@Column(name="Bank")
	private String bank;

	@Column(name="AccountNumber")
	private String accountNumber;
	
	@Column(name="AccountBalance")
	private BigDecimal balance;


	public UserProfile() {
		super();
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public UserProfile(int id, String fname, String lname, String userId, String bank, String accountNumber, BigDecimal balance) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.userId = userId;
		this.bank = bank;
		this.accountNumber = accountNumber;
		this.balance = balance;
	}

	
	
	
	
	
	
	
	
	
}
