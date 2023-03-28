package com.AdvancedMapping.Mapping.Repository;

import javax.persistence.EntityManager;

import com.AdvancedMapping.Mapping.Models.UserProfile;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.AdvancedMapping.Mapping.Models.PayeeInfo;

@Repository
public interface PayeeRepo extends CrudRepository<PayeeInfo, Long> {
}
