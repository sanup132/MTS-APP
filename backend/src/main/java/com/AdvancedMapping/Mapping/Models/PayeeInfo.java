package com.AdvancedMapping.Mapping.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Entity
@Table(name="Payee")
public class PayeeInfo {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="AccountNumber")
	private String accountNumber;
	
	@Column(name="Name")
	private String name;

	@Column(name="PayerID")
	private String payerId;

	public String getPayerId() {
		return payerId;
	}

	public void setPayerId(String payerId) {
		this.payerId = payerId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PayeeInfo(String accountNumber, String name, String payerId) {
		super();
		this.accountNumber = accountNumber;
		this.name = name;
		this.payerId = payerId;
	}

	public PayeeInfo(Long id, String accountNumber, String name, String payerId) {
		super();
		this.id = id;
		this.accountNumber = accountNumber;
		this.name = name;
		this.payerId = payerId;
	}

	public PayeeInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
