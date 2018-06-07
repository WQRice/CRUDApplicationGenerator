package OITWeb.edu.rice.controller;

import OITWeb.edu.rice.exception.ResourceNotFoundException;
import OITWeb.edu.rice.model.Cake;
import OITWeb.edu.rice.repository.CakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CakeController {
    @Autowired
    CakeRepository entityRepository;

    //get all entitys
    @CrossOrigin
    @GetMapping("/Cake")
    public List<Cake> getAllCakes(){
        return entityRepository.findAll();
    }

    //create entity profile
    @CrossOrigin
    @PostMapping("/Cake")
    public Cake createCake(@Valid @RequestBody Cake entity){
        return entityRepository.save(entity);
    }

    //get entity by id
    @CrossOrigin
    @GetMapping("/Cake/{id}")
    public Cake getCakeById(@PathVariable(value="id") Long id){
        return entityRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Cake","id",id));
    }

    //update profile
    @CrossOrigin
    @PutMapping("/Cake/{id}")
    public Cake updateCake(@PathVariable(value="id") Long id, @Valid @RequestBody Cake entityDetail){
        Cake entity=entityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Cake","id",id));

        entity.setColor(entityDetail.getColor());
        entity.setPrice(entityDetail.getPrice());
        entity.setMass(entityDetail.getMass());        
		Cake updateCake=entityRepository.save(entity);
        return updateCake;
    }

    //Delete entity profile
    @CrossOrigin
    @DeleteMapping("/Cake/{id}")
    public ResponseEntity<?> deleteCake(@PathVariable(value="id") Long id){
        Cake entity=entityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Cake","id",id));
        entityRepository.delete(entity);
        return ResponseEntity.ok().build();

    }
    
    //mapping index.html
    @CrossOrigin
    @RequestMapping(value="/")
    public String index() {
        return "index.html";
    }
}