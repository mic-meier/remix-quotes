const NewQuotesRoute = () => {
  return (
    <div>
      <p>Add a new quote</p>
      <form className="flex flex-col gap-4 w-full">
        <div>
          <label htmlFor="content">Quote</label>
          <textarea name="content" id="content" />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="author" />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default NewQuotesRoute
