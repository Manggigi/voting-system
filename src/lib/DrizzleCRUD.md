<!-- this is a basic documentation of drizzle orm CRUD -->

## Drizzle CRUD

###### Read more [Drizzle Orm Query](https://orm.drizzle.team/docs/rqb)

#### Select

###### select \* from 'users';

```
users = await db
  .select()
  .from(UsersTable);
```

#### Insert

###### insert into "users" ("name") values (userData);

```
await db
.insert(UsersTable)
.values({
  name: 'Gian Denorte',
  username: 'gigi',
  avatar: 'https://avatars.githubusercontent.com/u/1004701?v=4'
  })
```

#### Update

###### update "users" set "name" = 'Gian Pogi' where "username" = 'gigi';

```
await db.update(users)
  .set({ name: 'Gian Pogi' })
  .where(eq(users.username, 'gigi'));
```

#### Delete

##### delete from "users" where "username" = 'gigi';

```
await db
  .delete(UsersTable)
  .where(eq(UsersTable.username, 'gigi'))
  .returning();
```

###### delete all rows from "users";

```
await db.delete(users);
```
