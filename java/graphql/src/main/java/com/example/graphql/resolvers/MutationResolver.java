package com.example.graphql.resolvers;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.graphql.entities.AddPetInput;
import com.example.graphql.entities.Pet;
import com.example.graphql.entities.Result;
import com.example.graphql.services.PetService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MutationResolver implements GraphQLMutationResolver {
    private static final Logger logger = LogManager.getLogger(MutationResolver.class);

    @Autowired
    private PetService petService;

    public Result addPet(String name, int age){
        logger.info("MutationResolver ==> addPet");
        logger.info("params: name:{}, age:{}", name, age);
        return petService.addPet(name, age);
    }

    public Result deletePet(String id){
        logger.info("MutationResolver ==> deletePet");
        logger.info("params: id:{}", id);
        return petService.deletePet(id);
    }

    public Pet updatePet(String id, String name, int age){
        logger.info("MutationResolver ==> updatePet");
        logger.info("params: id:{}, name:{}, age:{}", id, name, age);
        return petService.updatePet(id, name, age);
    }

    public Pet addPetByInput(AddPetInput addPetInput){
        logger.info("MutationResolver ==> addPetByInput");
        logger.info("params: addPetInput:{}", addPetInput);
        return petService.addPetByInput(addPetInput);

    }

}
