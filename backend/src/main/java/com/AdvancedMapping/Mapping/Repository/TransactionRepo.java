package com.AdvancedMapping.Mapping.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.AdvancedMapping.Mapping.Models.Transaction;

@Repository
public interface TransactionRepo extends CrudRepository<Transaction, Long> {
}
