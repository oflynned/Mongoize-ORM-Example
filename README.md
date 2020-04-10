### Pages

| Description                       | Endpoint    
| ------------                      |-----------                                                                   |
| View all users                    | /
| View a specific user              | /:id
| View a specific user's comments   | /:id/comments

### Routes

| Verb      | Endpoint    
| ----------|-----------                                                                   |
| GET, POST | /api/users
| GET       | /api/users/:id
| GET       | /api/users/:id/comments
| GET, POST | /api/comments
| GET       | /api/comments/:id
| GET       | /api/comments/:id/poster

### Payloads

User

```
{
    name: <string>
    email: <string>
}
```

Comment

```
{
    posterId: <string>
    content: <string>
}
```
