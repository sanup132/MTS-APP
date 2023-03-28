package com.AdvancedMapping.Mapping.Models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

@Entity
@Table(name="Transaction")
public class Transaction {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="Date")
	private LocalDateTime date;
	
	@Column(name="Amount")
	private BigDecimal amount;
	
	@Column(name="TransactionType")
	private String transactionType;

	@Column(name="PayerId")
	private String payerId;

	public String getPayerId() {
		return payerId;
	}

	public void setPayerId(String payerId) {
		this.payerId = payerId;
	}

	public String getPayeeId() {
		return payeeId;
	}

	public void setPayeeId(String payeeId) {
		this.payeeId = payeeId;
	}

	@Column(name="PayeeId")
	private String payeeId;
		
	@Column(name="Remarks")
	private String remarks;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	public Transaction() {
		super();
	}

	public Transaction(Long id, BigDecimal amount, String transactionType, String remarks, String payerId, String payeeId, LocalDateTime date) {
		super();
		this.id = id;
		this.amount = amount;
		this.transactionType = transactionType;
		this.remarks = remarks;
		this.date = date;
		this.payeeId = payeeId;
		this.payerId = payerId;
	}

	public Transaction(Long id, BigDecimal amount, String transactionType, String remarks, String payerId, String payeeId) {
		super();
		this.id = id;
		this.amount = amount;
		this.transactionType = transactionType;
		this.remarks = remarks;
		this.payeeId = payeeId;
		this.payerId = payerId;
	}

}
