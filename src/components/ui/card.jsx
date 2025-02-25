import PropTypes from "prop-types";

export function Card({ className, children, ...props }) {
  return (
    <div className={`bg-white rounded-lg border ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`p-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-xl font-semibold ${className || ""}`} {...props}>
      {children}
    </h3>
  );
}

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-6 pt-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
