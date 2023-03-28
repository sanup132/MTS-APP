package com.AdvancedMapping.Mapping.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.AdvancedMapping.Mapping.Models.AddBalance;
import com.AdvancedMapping.Mapping.Models.PayeeInfo;
import com.AdvancedMapping.Mapping.Models.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AdvancedMapping.Mapping.Models.UserProfile;
import com.AdvancedMapping.Mapping.Repository.PayeeRepo;
import com.AdvancedMapping.Mapping.Repository.TransactionRepo;
import com.AdvancedMapping.Mapping.Repository.UserRepo;

@Service
@Transactional(rollbackOn= SQLException.class)
public class UserAccountService {

	private UserRepo userRepo;
	private PayeeRepo payeeRepo;
	private TransactionRepo transactionRepo;

	@Autowired
	public UserAccountService(UserRepo userRepo, PayeeRepo payeeRepo, TransactionRepo transactionRepo) {
		this.userRepo = userRepo;
		this.payeeRepo = payeeRepo;
		this.transactionRepo = transactionRepo;
	}


	public Optional<UserProfile> getUserAccountInfo(String userId) {
		return userRepo.findById(userId);
	}


    public UserProfile updateUserProfile(UserProfile user) {
		return userRepo.save(user);
    }

	public PayeeInfo addPayee(PayeeInfo payeeInfo) {
		return payeeRepo.save(payeeInfo);
	}

	public List<PayeeInfo> getUserPayees(String payerId) {
		List<PayeeInfo> payeeInfos = new ArrayList<>();
		payeeRepo.findAll().forEach(payeeInfo -> {
			if(payeeInfo.getPayerId().equals(payerId)) {
				payeeInfos.add(payeeInfo);
			}
		});
		return payeeInfos;
	}
    //Method to make transaction
	public Transaction makeTransaction(Transaction transaction) {
		Optional<UserProfile> payerInfo = getUserAccountInfo(transaction.getPayerId());

		if ((payerInfo.get().getBalance().compareTo(transaction.getAmount()) == 1) && (payerInfo.get().getAccountNumber() != "")) {
			Transaction _transaction = new Transaction();
			_transaction.setPayerId(transaction.getPayerId());
			_transaction.setPayeeId(transaction.getPayeeId());
			_transaction.setTransactionType(transaction.getTransactionType());
			_transaction.setAmount(transaction.getAmount());
			_transaction.setRemarks(transaction.getRemarks());
			_transaction.setDate(LocalDateTime.now());
			Transaction savedTransaction = transactionRepo.save(_transaction);
			payerInfo.get().setBalance(payerInfo.get().getBalance().subtract(transaction.getAmount()));
			return savedTransaction;
		}

		userRepo.save(payerInfo.get());
		return null;
	}

	public List<Transaction> getUserTransactions(String payerId) {
		List<Transaction> transactionList = (List<Transaction>) transactionRepo.findAll();
		List<Transaction> transactions = transactionList.stream().filter(m -> m.getPayerId().equals(payerId)).collect(Collectors.toList());
		return transactions;
	}

	public Optional<PayeeInfo> getPayeeInfo(Long payeeId) {
		return payeeRepo.findById(payeeId);
	}

	public Optional<Transaction> getTransaction(Long transactionId) {
		return transactionRepo.findById(transactionId);
	}

	public String addBalance(AddBalance addBalance) {
		Optional<UserProfile> userInfo = getUserAccountInfo(addBalance.getUserId());
		if (!(userInfo.isEmpty())) {
			BigDecimal updatedBalance = userInfo.get().getBalance().add(addBalance.getBalance());
			userInfo.get().setBalance(updatedBalance);
			userRepo.save(userInfo.get());
			return "Bank Balance Updated Successfully";
		}
		return "Please add account info to update balance";
	}
}
