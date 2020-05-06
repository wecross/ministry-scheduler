import route from "@src/route";

export default route((db, req) => {
  return db.person.findMany();
});
