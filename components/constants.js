import styled from "styled-components";

export const COLORS = {
  category: "#008376",
  projects: "#9900cc",
  category_cloudy: "#85e7dd",
  projects_cloudy: "#d69aea",
};

export const MainNavButton = styled.li`
  text-align: center;
  position: relative;
  flex-grow: 1;
  height: 100%;
  background: ${(props) => (props.type === null ? "linear-gradient(0deg,#bdbbbb 0%,#dbdbdb 100%)" : `linear-gradient(0deg, ${COLORS[props.type + "_cloudy"]} 0%, ${COLORS[props.type]} 100%)`)};
  color: ${(props) => (props.type ? "#d9d9d9" : "#1c1c1c")};

  &:hover span {
    color: ${(props) => COLORS[props.type]};
  }

  > a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
  }
`;

export const MainNavLine = styled.li`
  text-align: center;
  position: relative;
  width: 1px;
  height: 41px;
  background: ${(props) =>
    props.type === null ? "linear-gradient(0deg, #ffffff 0%, #5a5a5a 30%, #5a5a5a 70%, #ffffff 100%)" : `linear-gradient(0deg, ${COLORS[props.type + "_cloudy"]} 0%, ${COLORS[props.type]} 100%)`};
`;

export const MainNavFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: ${(props) => (props.type === null ? "" : COLORS[props.type])};
`;

export const MainNavHeader = styled.div`
  height: 100%;
  flex-grow: 1;
  text-align: center;
  color: ${(props) => (props.type === null ? "#5a5a5a" : "#d9d9d9")};
  background-color: ${(props) => (props.type === null ? "#dbdbdb" : COLORS[props.type])};
`;

export const FooterLine = styled.div`
  height: 100%;
  flex-grow: 1;
  text-align: center;
  background-color: ${(props) => (props.type === null ? "#ffffff" : COLORS[props.type])};
`;
