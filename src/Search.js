import React from "react";
import axios from "axios";
import Images from "./Images"
class Search extends React.Component{
    state={
        keyword: "",
        photos: [],
        loader: false
    };
    // mkaing an object e 
    inputHandle = (e) =>{
        // calling and updating the above keyword state
        this.setState({keyword: e.target.value });

    };
    searchImages = async (e) => {
        e.preventDefault();
        this.setState({loader: true});
        const res= await axios.get(`https://api.pexels.com/v1/search?query=
        ${this.state.keyword} &per_page=15&page=1
        `,
        {
            headers:{
                Authorization: '563492ad6f91700001000001f52590e43ec342ca8c4769a8e6e6dbee'
            }
        });
        this.setState({loader: false});
        this.setState({photos: res.data.photos});
        console.log(this.state.photos);
    };
    render(){
        return(
            <>
            <form onSubmit= {this.searchImages}>
                <div className="form-group">
                    <input type="text" name="keyword"
                    className="form-control" value={this.state.keyword}
                    onChange={this.inputHandle}
                    placeholder="Search images..."
                    />
                </div>
                <div className="form-group">
                    <input type="submit"  value="Search images"
                    className="btn btn-primary btn-block"
                    />
                </div>
            </form>
            <div className="row">
            {!this.state.loader ? (
            this.state.photos.map(img =>
              <Images image ={img} key={img.id} />  
            )
            ): <h1> Loading...</h1>}
            </div>
            </>
        );
    }
}

export default Search;