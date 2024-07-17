package com.rohit.taskmate.repository;

import com.rohit.taskmate.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
