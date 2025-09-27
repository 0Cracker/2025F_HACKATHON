package com.example.my_app.project.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Long 타입이면 AUTO나 IDENTITY 둘 다 가능
    private Long id;  

    @Column(nullable = false)
    private String title;  

    @Column(name = "created_by", nullable = false)
    private String createdBy;  
}