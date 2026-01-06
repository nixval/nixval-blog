---
title: "Borrowing and References (Rust Part 2)"
description: "Continuing our Rust journey with borrowing mechanics."
pubDate: "2024-01-03"
heroImage: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
tags: ["rust", "programming", "series"]
series: "Rust Mastery"
seriesOrder: 2
draft: false
---

## The Rules of References

Welcome back to Part 2! If you missed Part 1, check the **Series Widget** to navigate back.

At any given time, you can have either but not both of:
1. One mutable reference.
2. Any number of immutable references.

```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM
```
