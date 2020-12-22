const fs = require( 'fs' );

const dir = './src/';
const names = {
  'cur': [ 'ストラトキャスター', 'テレキャスター', 'レスポール', '黒', '白', ],
  'new': [ 'stratocaster', 'telecaster', 'lespaul', 'black', 'white', ],
};

const replaceEach = ( str, curStrArr, newStrArr ) => {
  if ( typeof str !== 'string' ) {
    console.error( '第一引数には文字列を入れてください。' );
    return;
  }

  if ( curStrArr.length !== newStrArr.length ) {
    console.error( '文字列を収めた置換前・後の配列の要素数が異なります。要素数を揃えてください。' );
    return;
  }

  return newStrArr.reduce( ( acc, curVal, i ) => {
    return acc.replace( curStrArr[ i ], curVal )
  }, str );
}

const curNameArr = fs.readdirSync( dir );
const newNameArr = curNameArr.map( curName => {
  return replaceEach( curName, names.cur, names.new ).toLowerCase();
} );

newNameArr.forEach( ( newPath, i ) => {
  fs.rename( `${dir}${curNameArr[ i ]}`, `${dir}${newPath}`, ( err ) => {
    if ( err ) {
      console.error( err );
    }

    if ( curNameArr[ i ] === newPath ) {
      console.log( `\"${curNameArr[ i ]}\" has already been replaced.` );
    } else {
      console.log( `\"${curNameArr[ i ]}\" was replaced with \"${newPath}\".` );
    }
  } );
} );
