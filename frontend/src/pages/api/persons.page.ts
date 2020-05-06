import route from "@src/route";

export default route(db => {
  return db.person.findMany();
});
