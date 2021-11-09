package com.example.graphql.dao;

import com.example.graphql.entities.AddPetInput;
import com.example.graphql.entities.Pet;
import com.example.graphql.entities.Result;
import com.example.graphql.util.UUIDUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class PetRepository {
    private static final Logger logger = LogManager.getLogger(PetRepository.class);

    private Map<String, Pet> petCache = new HashMap<String, Pet>();

    public List<Pet> listPets(){
        return new ArrayList<Pet>(petCache.values());
    }

    public Result addPet(String name, int age){
        String id = UUIDUtils.getUUID();
        Pet pet = new Pet(id, name, age);
        petCache.put(id, pet);
        return new Result(100, "success");
    }

    public Result deletePet(String id){
        if(!petCache.containsKey(id)){
            logger.warn("cannot find pet with id={}", id);
            return new Result(99, "failed to delete pet(id={" + id + "})");
        }else{
            petCache.remove(id);
        }
        return new Result(100, "success");
    }

    public Pet updatePet(String id, String name, int age){
        if(!petCache.containsKey(id)){
            logger.warn("cannot find pet with id={}", id);
            return null;
        }
        Pet pet= petCache.get(id);
        pet.setName(name);
        pet.setAge(age);
        return pet;
    }

    public Pet addPetByInput(AddPetInput addPetInput){
        String id = UUIDUtils.getUUID();
        Pet pet = new Pet(id, addPetInput.getName(), addPetInput.getAge());
        petCache.put(id, pet);
        return pet;
    }
}
