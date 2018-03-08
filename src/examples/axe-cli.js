export default `it('passes a11y checks', () => {
  return axe.run(document)
    .then(data => {
      expect(data.violations).toHaveLength(0)
    });
});`;
