package OITWeb.edu.rice.repository;

import OITWeb.edu.rice.model.Cake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CakeRepository extends JpaRepository<Cake,Long>{

}