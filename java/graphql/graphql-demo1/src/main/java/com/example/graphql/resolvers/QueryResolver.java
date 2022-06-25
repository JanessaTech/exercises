package com.example.graphql.resolvers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.graphql.entities.Pet;
import com.example.graphql.services.PetService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QueryResolver implements GraphQLQueryResolver {
    private static final Logger logger = LogManager.getLogger(QueryResolver.class);

    @Autowired
    private PetService petService;

    public List<Pet> listPets() {
        logger.info("Return all pets");
        List<Pet> pets = petService.listPets();
        return pets;
    }
}
