export default function(React) {

  const LocLevel = React.createClass({
    handleClick(i) {
      this.props.zoomOutToLevel(i);
    },
    render() {

      var levels = ["global", "super region", "region"].slice(0, this.props.level + 1);

      var buttons = levels.map( (level, i) => {
        return (
          <button
            key={i}
            className={`location-level__button location-level__button--${level}`}
            onClick={this.handleClick.bind(this, i)}>
            {level}
          </button>
        );
      });

      return (
        <div className={`location-level`}>
          <p className="location-level__label">zoom level</p>
          <div className="location-level__button-container">{buttons}</div>
        </div>
      );
    }
  });

  return LocLevel;
};
