package OITWeb.sample.controller;

import OITWeb.sample.exception.ResourceNotFoundException;
import OITWeb.sample.model.Note;
import OITWeb.sample.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    NoteRepository entityRepository;

    //get all entitys
    @CrossOrigin
    @GetMapping("/Note")
    public List<Note> getAllNotes(){
        return entityRepository.findAll();
    }

    //create entity profile
    @CrossOrigin
    @PostMapping("/Note")
    public Note createNote(@Valid @RequestBody Note entity){
        return entityRepository.save(entity);
    }

    //get entity by id
    @CrossOrigin
    @GetMapping("/Note/{id}")
    public Note getNoteById(@PathVariable(value="id") Long id){
        return entityRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Note","id",id));
    }

    //update profile
    @CrossOrigin
    @PutMapping("/Note/{id}")
    public Note updateNote(@PathVariable(value="id") Long id, @Valid @RequestBody Note entityDetail){
        Note entity=entityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Note","id",id));

        entity.setTitle(entityDetail.getTitle());
        entity.setContent(entityDetail.getContent());        
		Note updateNote=entityRepository.save(entity);
        return updateNote;
    }

    //Delete entity profile
    @CrossOrigin
    @DeleteMapping("/Note/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value="id") Long id){
        Note entity=entityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Note","id",id));
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