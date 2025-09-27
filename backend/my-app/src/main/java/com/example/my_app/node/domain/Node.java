package com.example.my_app.node.domain;

import com.example.my_app.project.domain.Project;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 노드 고유 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projects_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Node parent;  // 최상위 노드는 null

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Node> children = new ArrayList<>();


    @Column(name = "node_text", nullable = false)
    private String nodeText;

    @Column(name = "memo_text")
    private String memoText;

}
