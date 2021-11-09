package com.example.graphql.services;

import com.example.graphql.entities.AddPetInput;
import com.example.graphql.entities.Pet;
import com.example.graphql.entities.Result;

import java.util.List;

public interface PetService {
    List<Pet> listPets();
    Result addPet(String name, int age);
    Result deletePet(String id);
    Pet updatePet(String id, String name, int age);
    Pet addPetByInput(AddPetInput addPetInput);
}
