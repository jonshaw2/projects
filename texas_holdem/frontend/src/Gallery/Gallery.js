import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Gallery.action';
import {Link} from 'react-router';

class Gallery extends React.Component{
componentDidMount() {
  this.props.getGallery();
}

  render(){

    let category = ''

    let toaster = ''


    if (this.props.category.length !== 0){
      console.log('truthy?');
      category = this.props.category.map((categories, idx) =>

        <div key={idx} className="category" >
          <h2>
            {categories.toUpperCase()}
          </h2>
        <div>
        {this.props.tables[categories].map((tables, idx2) =>
            <div className="imageAndName" key={idx2}>
            <Link to={"/tables/" + tables.id}>
              {tables.tablename}
            </Link>

            </div>
          )}
        </div>
      </div>

      )
    }
    return(
      <div>
      <h1>
      Tables
      </h1>
      <h3>
      {category}
      </h3>
      {toaster}
      </div>
    );
  }
}

const GalleryContainer = ReactRedux.connect(
  state=>({
    index: state.galleryIndex.index,
    tables: state.galleryIndex.tables,
    category: state.galleryIndex.category
  }),
  actions
)(Gallery);

export default GalleryContainer;
