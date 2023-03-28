package com.AdvancedMapping.Mapping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class MappingHibernateApplication {

	public static void main(String[] args) {
		SpringApplication.run(MappingHibernateApplication.class, args);
	}

}
