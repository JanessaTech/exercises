package com.example.graphql.services;

import com.example.graphql.dao.PetRepository;
import com.example.graphql.entities.AddPetInput;
import com.example.graphql.entities.Pet;
import com.example.graphql.entities.Result;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PetServiceImp implements PetService{
    @Resource
    private PetRepository petRepository;

    @Override
    public List<Pet> listPets() {
        return petRepository.listPets();
    }

    @Override
    public Result addPet(String name, int age) {
        return petRepository.addPet(name, age);
    }

    @Override
    public Result deletePet(String id) {
        return petRepository.deletePet(id);
    }

    @Override
    public Pet updatePet(String id, String name, int age) {
        return petRepository.updatePet(id, name, age);
    }

    @Override
    public Pet addPetByInput(AddPetInput addPetInput) {
        return petRepository.addPetByInput(addPetInput);
    }
}
