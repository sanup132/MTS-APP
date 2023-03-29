package com.AdvancedMapping.Mapping.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.AdvancedMapping.Mapping.Models.Transaction;

import java.util.List;

@Repository
public interface TransactionRepo extends CrudRepository<Transaction, Long> {

    @Query(value = "select * from Transaction order by id desc limit 10", nativeQuery = true)
    List<Transaction> findLast10Transactions();

    @Query(value = "select * from Transaction where MONTH(date) = MONTH(now()) and YEAR(date) = YEAR(now())", nativeQuery = true)
    List<Transaction> findCurrentMonthTransactions();

    @Query(value = "SELECT * FROM bank.Transaction where date > now() - INTERVAL 90 DAY", nativeQuery = true)
    List<Transaction> findLast3MonthTransactions();


}
