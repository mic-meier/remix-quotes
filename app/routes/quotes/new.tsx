const NewQuotesRoute = () => {
  return (
    <div>
      <p>Add a new quote</p>
      <form>
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
