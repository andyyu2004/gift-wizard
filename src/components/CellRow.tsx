/** A component representing a row of cells */ 

import React from 'react'
import { useSelector } from 'react-redux';
import { ThemeState } from '../reducers/themeReducer';
import { AppState } from '../reducers';


const RowContainer = ({ title, subtitle, children }) => {
  const theme = useSelector<AppState, ThemeState>(state => state.theme);
  const colorDark = theme.colorDark;
  const colorLight=theme.colorLight;
  const styles = {
    title: {
      fontFamily: "Helvetica Neue, Helvetica, sans-serif",
      fontSize: "150%",
      color: theme.colorDark,
    },
    cellRow: {
      borderTop:"solid 2px #DCDCDC",
      padding: "30px",
      margin: "2px",
      minHeight: "300px",
    },
    cellContainer: {
      textAlign:"center" as const
    }
  };

  return (
    <div style={styles.cellRow}>
      <h5 style={styles.title} >{title}</h5>
      <h6>{subtitle}</h6>
      <div style={styles.cellContainer}>{children}</div>
    </div>
  );
};

export default RowContainer;