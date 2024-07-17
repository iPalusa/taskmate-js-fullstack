package com.rohit.taskmate.service;

import com.rohit.taskmate.entity.Todo;
import com.rohit.taskmate.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo getTodoById(Long id) {
        Optional<Todo> optionalTodoItem = todoRepository.findById(id);
        return optionalTodoItem.orElse(null); // Handle optional if needed
    }

    @Override
    public Todo createTodo(Todo todoItem) {
        todoItem.setCreatedDate(LocalDateTime.now());
        return todoRepository.save(todoItem);
    }

    @Override
    public Todo updateTodo(Long id, Todo todoItem) {
        Todo existingTodoItem = getTodoById(id);
        if (existingTodoItem != null) {
            existingTodoItem.setTitle(todoItem.getTitle());
            existingTodoItem.setDescription(todoItem.getDescription());
            existingTodoItem.setStatus(todoItem.getStatus());
            return todoRepository.save(existingTodoItem);
        }
        return null; // Handle if item not found
    }

    @Override
    public void deleteTodo(Long id) {
        Todo existingTodoItem = getTodoById(id);
        if (existingTodoItem != null) {
            todoRepository.delete(existingTodoItem);
        }
        // Handle if item not found
    }
}
