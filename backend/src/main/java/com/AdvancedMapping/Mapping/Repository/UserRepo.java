package com.AdvancedMapping.Mapping.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.AdvancedMapping.Mapping.Models.UserProfile;

@Repository
public interface UserRepo extends CrudRepository<UserProfile, String> {
}
