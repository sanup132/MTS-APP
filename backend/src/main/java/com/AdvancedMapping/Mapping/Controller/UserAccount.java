package com.AdvancedMapping.Mapping.Controller;

import java.util.List;
import java.util.Optional;

import com.AdvancedMapping.Mapping.Models.AddBalance;
import com.AdvancedMapping.Mapping.Models.PayeeInfo;
import com.AdvancedMapping.Mapping.Models.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.AdvancedMapping.Mapping.Models.UserProfile;
import com.AdvancedMapping.Mapping.service.UserAccountService;

@CrossOrigin(origins = "*")
@RestController()
@RequestMapping("/bank")
public class UserAccount {
	
	@Autowired
	private UserAccountService userService;
	
	//Method to get the user account info
	@GetMapping("/users/{userId}")
	public ResponseEntity getUserAccountInfo(@PathVariable String userId) {
		 Optional<UserProfile> user = userService.getUserAccountInfo(userId);
		 return ResponseEntity.ok().body(user);
	}

	//Method to get the payee info
	@GetMapping("/users/payee/{payeeId}")
	public ResponseEntity getPayeeInfo(@PathVariable String payeeId) {
		 Optional<PayeeInfo> payeeInfo = userService.getPayeeInfo(Long.parseLong(payeeId));
		 return ResponseEntity.ok().body(payeeInfo);
	}

	// Method to add User
	@PostMapping("/users/update-profile")
	public UserProfile updateUserProfile(@RequestBody UserProfile user) {
		UserProfile _user = userService.updateUserProfile(user);
		return _user;
	}

	// Method to add Payee
	@PostMapping("/users/add-payee")
	public PayeeInfo addPayee(@RequestBody PayeeInfo payeeInfo) {
		PayeeInfo _payeeInfo = userService.addPayee(payeeInfo);
		return _payeeInfo;
	}

	//Method to get all user payees
	@GetMapping("/users/getPayees/{payerId}")
	public ResponseEntity<List<PayeeInfo>> getUserPayees(@PathVariable String payerId) {
		List<PayeeInfo> userPayees = userService.getUserPayees(payerId);
		return ResponseEntity.ok().body(userPayees);
	}

	// Method to create Transaction
	@PostMapping("/users/make-transaction")
	public Transaction makeTransaction(@RequestBody Transaction transaction) {
		Transaction _transaction = userService.makeTransaction(transaction);
		if (_transaction == null) {
			return null;
		}
		return _transaction;
	}

	// Method to get User Transactions
	@GetMapping("/users/get-user-transactions/{payerId}")
	public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable String payerId) {
		List<Transaction> transactions = userService.getUserTransactions(payerId);
		return ResponseEntity.ok().body(transactions);
	}

	// Method to get Transaction info
	@GetMapping("/users/transactions/{transactionId}")
	public ResponseEntity getTransaction(@PathVariable String transactionId) {
		Optional<Transaction> transaction = userService.getTransaction(Long.parseLong(transactionId));
		return ResponseEntity.ok().body(transaction);
	}

	// Method to add account balance
	@PostMapping("/users/add-balance")
	public ResponseEntity addBalance(@RequestBody AddBalance addBalance) {
		String response = userService.addBalance(addBalance);
		return ResponseEntity.ok().body(response);
	}

	// Method to get last 10 Transactions
	@GetMapping("/users/last-10-transactions")
	public ResponseEntity getLast10Transactions() {
		List<Transaction> transactions = userService.getLast10Transactions();
		return ResponseEntity.ok().body(transactions);
	}

	// Method to get current month Transactions
	@GetMapping("/users/current-month-transactions")
	public ResponseEntity getCurrentMonthTransactions() {
		List<Transaction> transactions = userService.getCurrentMonthTransactions();
		return ResponseEntity.ok().body(transactions);
	}

	// Method to get last 3 months Transactions
	@GetMapping("/users/last-3-months-transactions")
	public ResponseEntity getLast3MonthTransactions() {
		List<Transaction> transactions = userService.getLast3MonthTransactions();
		return ResponseEntity.ok().body(transactions);
	}

}
